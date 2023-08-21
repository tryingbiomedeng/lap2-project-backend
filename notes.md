## Available endpoints

| Route | Method | Response |
| --- | --- | --- |
| `/` | `GET` | Returns a JSON object describing the API. |

-For the account
| `/account` | `GET` | Returns a JSON object containing all user accounts info. |
| `/account` | `POST` | Accepts a JSON object and uses it to create and store a new account. |
| `/account/:id` | `GET` | Returns a specific accounts details. |
(to patch and delete contact an admin)

-For the profile
| `/profile/:id` | `GET` | Returns a JSON object containing all the profile info of an acccount. |
| `/profile/:id` | `POST` | Accpets a new JSON object , selected by `:id` to make a profile account. |
| `/profile/:id` | `PATCH` | Updates a specific part of the profile. |
| `/profile/:id` | `DELETE` | Deletes the profile, selected by `:id`. |

-For the items
| `/items` | `GET` | Returns a JSON object containing all the items on sale info. |
| `/items` | `POST` | Accepts a JSON object and uses it to create and store a new item. |
| `/item/:id` | `GET` | Returns a specific items details. |
| `/item/:id` | `DELETE` | Deletes the item, selected by `:id`. |

-For the job adverts
| `/jobs` | `GET` | Returns a JSON object containing all the jobs available. |
| `/jobs` | `POST` | Accepts a JSON object and uses it to create and store a new job request. |
| `/jobs/:id` | `GET` | Returns a specific jobs details. |
| `/jobs/:id` | `DELETE` | Deletes the job, selected by `:id`. |