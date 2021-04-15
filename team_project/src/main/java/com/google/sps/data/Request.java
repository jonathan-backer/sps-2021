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

package com.google.sps.data;

import com.google.cloud.datastore.Blob;
import com.google.sps.data.*;

public final class Request {

  private final long id;
  private final String firstName;
  private final String lastName;
  private final String email;
  private final String requesting;
  private final Category category;
  private final String description;
  private final String location;
  private final long timestamp;

  public Request(
    long id, 
    String firstName,
    String lastName,
    String email,
    String requesting,
    Category category,
    String description,
    String location,
    long timestamp
    ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.requesting= requesting;
    this.category = category;
    this.description = description;
    this.location = location;
    this.timestamp = timestamp;
  }
}