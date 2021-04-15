// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.gson.Gson; 
import com.google.gson.GsonBuilder;  

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Blob;
import com.google.sps.data.*;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

import java.util.*;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;

@WebServlet("/offer")
public class OfferServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("Offer").setOrderBy(OrderBy.desc("timestamp")).build();
    QueryResults<Entity> results = datastore.run(query);

    List<Offer> offers = new ArrayList<>();
    while (results.hasNext()) {
      Entity entity = results.next();

      long id = entity.getKey().getId();
      String firstName = entity.getString("firstName");
      String lastName = entity.getString("lastName");
      String email = entity.getString("email");
      String offering = entity.getString("offering");
      String category = entity.getString("category");
      String description = entity.getString("description");
      String picture = entity.getString("picture");
      String condition = entity.getString("condition");
      String location = entity.getString("location");
      long timestamp = entity.getLong("timestamp");

      Offer offer = new Offer(
        id,
        firstName,
        lastName,
        email,
        offering,
        Category.valueOf(category),
        description,
        picture,
        Condition.valueOf(condition),
        location,
        timestamp);
      offers.add(offer);
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(offers));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.
    String firstName = Jsoup.clean(request.getParameter("firstName"), Whitelist.none());
    String lastName = Jsoup.clean(request.getParameter("lastName"), Whitelist.none());
    String email = Jsoup.clean(request.getParameter("email"), Whitelist.none());
    String offering = Jsoup.clean(request.getParameter("offering"), Whitelist.none());
    String category = Jsoup.clean(request.getParameter("category"), Whitelist.none());
    String description = Jsoup.clean(request.getParameter("description"), Whitelist.none());
    String picture = Jsoup.clean(request.getParameter("picture"), Whitelist.none());
    String condition = Jsoup.clean(request.getParameter("condition"), Whitelist.none());
    String location = "TODO";
    long timestamp = System.currentTimeMillis();

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Offer");
    FullEntity offerEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("firstName", firstName)
            .set("lastName", lastName)
            .set("email", email)
            .set("offering", offering)
            .set("category", category)
            .set("description", description)
            .set("picture", picture)
            .set("condition", condition)
            .set("location", location)
            .set("timestamp", timestamp)
            .build();
    datastore.put(offerEntity);

    response.setStatus(201);
    response.sendRedirect("/index.html");
  }
}
