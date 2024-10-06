import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState();
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["event", "details", { id: id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  const {
    mutate,
    isPending,
    error: errorMutation,
    isError: isErrorMutation,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      navigate("/events");
      queryClient.cancelQueries({ queryKey: ["events"] });
    },
  });

  if (isError) {
    return (
      <ErrorBlock
        title={"Something went wrong"}
        message={error.info?.message || "Fetching event details went wrong"}
      />
    );
  }

  const handleStartDelete = () => {
    setIsDeleting(true);
  };
  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  const handleDelete = () => {
    mutate({ id });
  };

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete? This action cannot be undone</p>
          <div className="form-actions">
            <button
              onClick={handleStopDelete}
              className="button-text"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="button"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Confirm"}
            </button>
          </div>
          {isErrorMutation && (
            <ErrorBlock
              title="Failed to delete"
              message={
                errorMutation.info?.message ||
                "Failed to  event. Please try again later"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingIndicator />
        </div>
      )}
      {!isLoading && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>{"Delete"}</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img
              src={`http://localhost:3000/${data.image}`}
              alt="event image"
            />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {data.date} @ {data.time}
                </time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
