from rest_framework.routers import DefaultRouter
from .views import ShowViewSet, SeatViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'shows', ShowViewSet)
router.register(r'seats', SeatViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = router.urls