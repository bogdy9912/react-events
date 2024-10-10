# React Events learning app

Made this project as my learning journey of React

## Functionalities
  * use Tanstack for handling requests
  * `useQuery()` hook for fetching the data and caching them
  * `invalidateQueries()` for marking cached data as dirty in order to be refetch
  * `useMutation()` for sending POST requests
  * `mutate()` to trigger the POST requests
  * `onMutate` used for optimistic update
  * `fetchQuery` used with React Router as an alternative to hooks
  * create the querry keys dynamic by including the id, as we want to cache the data for each event

## DEMO

1. Default
![Default](https://github.com/bogdy9912/react-events/blob/main/demo/react-events-1.png)

2. Error when fetching
![Default](https://github.com/bogdy9912/react-events/blob/main/demo/react-events-2.png)

3. Add new Event
![Default](https://github.com/bogdy9912/react-events/blob/main/demo/react-events-3.png)

4. Event Details
![Default](https://github.com/bogdy9912/react-events/blob/main/demo/react-events-4.png)

5. Delete Event
![Default](https://github.com/bogdy9912/react-events/blob/main/demo/react-events-5.png)

6. Search for events
![Default](https://github.com/bogdy9912/react-events/blob/main/demo/react-events-6.png)



## To start the project:

Start the frontend by running:

** make sure you are at the root of the project `(/react-events)`:
```
npm run dev
```

Start the backend:

1. You have to go inside the backend folder `(/react-events/backend)`:
```
cd backend
```
2. And now start the server:
```
npm start
```
