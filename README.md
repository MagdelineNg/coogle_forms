# Coogle Forms
A survey form system. (WIP)

### Demo application and feedback
## Built using 
- ReactJS and MaterialUI (frontend)
- NodeJS, XLJS library (backend)

## Getting started:
- Clone this repository or fork it
    - To clone this repository type git clone `https://github.com/MagdelineNg/coogle_forms.git` on your command line
    - To fork this repository, click fork button of this repository then type git clone `https://github.com/<your username>/coogle_forms.git`
- Install all the dependencies of this project by typing `npm install`
- Run the `docker-compose.yaml` that builds the frontend and backend by typing `docker-compose up --build`
- Visit `localhost:3000` on your browser

## Stretch Goal B
To handle a potential surge in traffic for a survey form system, frontend, backend, infrastructure, and scalability considerations should be taken into account. (non-exhaustive)

1. **Frontend Optimization:**
    - Implement lazy loading for components that are not immediately visible (eg. a long form with multiple sections) to reduce the initial load time.
2. **Backend Scaling:**
    - Horizontal scaling of backend servers by adding more servers to cache users’ responses and load balancers to distribute the incoming traffic across servers in times of high traffic
    - Implement rate limiting and request validation to protect servers from abusive requests during a surge.
3. **Database Considerations:**
    - Use non-relational DBs that scale well like NoSQL databases (e.g., MongoDB, Cassandra) or scalable SQL databases (e.g., Amazon Aurora, Google Cloud Spanner).
    - Cache user responses to reduce the load of writing each response immediately into the primary database.

## Contact
- Magdeline Ng - [magdelinenxl@gmail.com](mailto:magdelinenxl@gmail.com)
- Project link: [https://github.com/kimlimjustin/google-form-clone](https://github.com/MagdelineNg/coogle_forms.git)
