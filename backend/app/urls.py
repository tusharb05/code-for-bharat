from django.urls import path
from .views import (RegisterView, 
                    LoginView, 
                    CreateRoadmapView, 
                    # RoadmapByIdView, 
                    # RoadmapListByUserView, 
                    # ToggleTaskCompletionView,
                    BulkWeekCreateView)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('create-roadmap/', CreateRoadmapView.as_view(), name='create-roadmap'),
    # path("roadmap-detail/", RoadmapByIdView.as_view(), name="roadmap-detail"),
    # path("roadmap-list/", RoadmapListByUserView.as_view(), name="roadmap-list"),
    # path("toggle-task-completion/", ToggleTaskCompletionView.as_view(), name="toggle-task-completion"),
    path("bulk-write/", BulkWeekCreateView.as_view(), name='bulk-write')
]
