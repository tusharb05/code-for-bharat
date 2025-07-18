from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, full_name, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email


class Roadmap(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="roadmaps")
    goal = models.CharField(max_length=255)
    timeline_weeks = models.PositiveIntegerField()
    parsed_resume = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    progress = models.FloatField(default=0.0)  # percentage of all tasks completed

    def __str__(self):
        return f"{self.goal} - {self.timeline_weeks} weeks"

    def update_progress(self):
        all_tasks = Task.objects.filter(week__roadmap=self)
        total = all_tasks.count()
        if total == 0:
            self.progress = 0.0
        else:
            completed = all_tasks.filter(completed=True).count()
            self.progress = round((completed / total) * 100, 2)
        self.save()


class Week(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name="weeks")
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField()  # Week 1, 2, etc.
    milestone = models.BooleanField(default=False)
    progress = models.FloatField(default=0.0)  # percentage of tasks completed

    def __str__(self):
        return f"Week {self.order}: {self.title}"

    def update_progress(self):
        total = self.tasks.count()
        if total == 0:
            self.progress = 0.0
        else:
            completed = self.tasks.filter(completed=True).count()
            self.progress = round((completed / total) * 100, 2)
        self.save()
        self.roadmap.update_progress()


class Task(models.Model):
    ARTICLE = "ARTICLE"
    PRACTISE = "PRACTISE"
    TASK_TYPE_CHOICES = [
        (ARTICLE, "Article"),
        (PRACTISE, "Practise"),
    ]

    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=255)
    resource_link = models.URLField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    type = models.CharField(max_length=10, choices=TASK_TYPE_CHOICES)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.type})"

    def mark_completed(self):
        self.completed = True
        self.save()
        self.week.update_progress()

