from django.core.management.base import BaseCommand
from django.db import connection
from api.models import Show, Seat
from datetime import date, time

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        # Clean slate
        Seat.objects.all().delete()
        Show.objects.all().delete()
        
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='api_show';")
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='api_seat';")

        # Create shows
        shows = [
            Show.objects.create(title="The Phantom of the Opera", genre="Musical", date=date(2026, 6, 20), time=time(19, 0), price=25),
            Show.objects.create(title="Hamlet", genre="Drama", date=date(2026, 6, 22), time=time(18, 30), price=20),
            Show.objects.create(title="The Lion King", genre="Musical", date=date(2026, 6, 25), time=time(17, 0), price=30),
            Show.objects.create(title="A Midsummer Night's Dream", genre="Comedy", date=date(2026, 6, 27), time=time(20, 0), price=18),
        ]

        # Create 48 seats per show
        rows = ["A", "B", "C", "D", "E", "F"]
        for show in shows:
            for row in rows:
                for number in range(1, 9):
                    Seat.objects.create(show=show, row=row, number=number, status="available")

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))