from django.db import models

class Show(models.Model):
    title = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.title


class Seat(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("taken", "Taken"),
    ]
    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name="seats")
    row = models.CharField(max_length=1)
    number = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="available")

    def __str__(self):
        return f"{self.row}{self.number} - {self.show.title}"


class Booking(models.Model):
    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name="bookings")
    seats = models.ManyToManyField(Seat)
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking for {self.show.title} at {self.booked_at}"