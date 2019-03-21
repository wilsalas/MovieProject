# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
import requests
# Create your views here.

def index(request):
    return render(request, 'index.html')    

 
#Send the list of the top of movies
def GetMovies(req):
    movieList = []
    responseData = {}
    for mov in range(500, 510):
        r = requests.get('https://api.themoviedb.org/3/movie/'+str(mov)+'?api_key=179f0459a762de9f8735efd6e2407527') 
        data = r.json()
        movieList += [{
            "id": mov,
            "rating": data["vote_average"],
            "title": data["title"],
            "poster": "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"+data["poster_path"],
            "category": data["genres"][0]["name"],
            "author": data["production_companies"][0]["name"]
        }]  
    responseData["movies"] = movieList        
    return JsonResponse(responseData)
   