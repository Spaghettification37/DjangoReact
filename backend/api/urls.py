from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("profile/<uuid:pk>/", views.ProfileRead.as_view(), name="profile-read"),
    path("profile/edit/", views.ProfileUpdate.as_view(), name="profile-update"),
]