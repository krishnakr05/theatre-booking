from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Show, Seat, Booking
from .serializers import ShowSerializer, SeatSerializer, BookingSerializer

class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all()
    serializer_class =ShowSerializer

class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer
    
    def get_queryset(self):
        queryset = Seat.objects.all()
        show_id = self.request.query_params.get('show_id')
        if show_id:
            queryset = queryset.filter(show=show_id)
        return queryset

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request):
        show_id = request.data.get('show')
        seat_ids = request.data.get('seats', [])

        show = Show.objects.get(id=show_id)
        booking = Booking.objects.create(show=show, user=request.user)
        booking.seats.set(seat_ids)
        booking.save()
        
        Seat.objects.filter(id__in=seat_ids).update(status="taken")

        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=201)