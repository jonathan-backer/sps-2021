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

@WebServlet("/request")
public class RequestServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("Request").setOrderBy(OrderBy.desc("timestamp")).build();
    QueryResults<Entity> results = datastore.run(query);

    List<Request> requests = new ArrayList<>();
    while (results.hasNext()) {
      Entity entity = results.next();

      long id = entity.getKey().getId();
      String firstName = entity.getString("firstName");
      String lastName = entity.getString("lastName");
      String email = entity.getString("email");
      String requesting = entity.getString("requesting");
      String category = entity.getString("category");
      String description = entity.getString("description");
      String picture = entity.getString("picture");
      long timestamp = entity.getLong("timestamp");

      Request request = new Request(
        id,
        firstName,
        lastName,
        email,
        requesting,
        Category.valueOf(category),
        description,
        location,
        timestamp);
      requests.add(request);
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(requests));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.
    String firstName = Jsoup.clean(request.getParameter("firstName"), Whitelist.none());
    String lastName = Jsoup.clean(request.getParameter("lastName"), Whitelist.none());
    String email = Jsoup.clean(request.getParameter("email"), Whitelist.none());
    String requesting = Jsoup.clean(request.getParameter("requesting"), Whitelist.none());
    String category = Jsoup.clean(request.getParameter("category"), Whitelist.none());
    String description = Jsoup.clean(request.getParameter("description"), Whitelist.none());
    String location = Jsoup.clean(request.getParameter("location"), Whitelist.none());
    long timestamp = System.currentTimeMillis();

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Request");
    FullEntity request =
        Entity.newBuilder(keyFactory.newKey())
            .set("firstName", firstName)
            .set("lastName", lastName)
            .set("email", email)
            .set("requesting", requesting)
            .set("category", category)
            .set("description", description)
            .set("location", location)
            .set("timestamp", timestamp)
            .build();
    datastore.put(requestEntity);

    response.setStatus(201);
  }
}
