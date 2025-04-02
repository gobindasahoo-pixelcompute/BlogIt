export const formatCreatedAtDate = created_at =>
  new Date(created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
