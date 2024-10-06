import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["event", "details", { id: id }],
    queryFn: ({ signal }) => {
      return fetchEvent({ id, signal });
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({
        queryKey: ["event", "details", { id: id }],
      });
      const previousEvent = queryClient.getQueryData([
        "event",
        "details",
        { id: id },
      ]);
      queryClient.setQueriesData(["event", "details", { id: id }], newEvent);
      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueriesData(
        ["event", "details", { id: id }],
        context.previousEvent
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["event", "details", { id: id }]);
    },
  });

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event, please check your inputs"
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    handleClose();
  }

  function handleClose() {
    navigate("../");
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
