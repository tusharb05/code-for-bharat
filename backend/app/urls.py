from django.urls import path
from .views import (RegisterView, 
                    LoginView, 
                    CreateRoadmapView, 
                    BulkWeekCreateView,
                    UserRoadmapListView,
                    RoadmapDetailView,
                    TaskCompletionUpdateView)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('create-roadmap/', CreateRoadmapView.as_view(), name='create-roadmap'),
    path("bulk-write/", BulkWeekCreateView.as_view(), name='bulk-write'),
    path("my-roadmaps/", UserRoadmapListView.as_view(), name="user-roadmap-list"),
    path('roadmap/<int:pk>/', RoadmapDetailView.as_view(), name='roadmap-detail'),
    path('task/<int:pk>/update-status/', TaskCompletionUpdateView.as_view(), name='task-update-status'),
]
