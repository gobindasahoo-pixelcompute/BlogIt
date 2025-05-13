export const formatPost = post => {
  const { title, description } = post;

  const newTitle = `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
  const newDescription = `${description
    .charAt(0)
    .toUpperCase()}${description.slice(1)}`;

  return { ...post, title: newTitle, description: newDescription };
};

export const formatDate = created_at =>
  new Date(created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const formatDraftTime = time => {
  const date = new Date(time);

  const timeString = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "");

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${timeString}, ${day} ${month} ${year}`;
};

export const formatPublishTime = time => {
  const date = new Date(time);

  const timeString = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "");

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day} ${year}, ${timeString}`;
};
