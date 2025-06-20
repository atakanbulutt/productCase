export function useToast() {
  const toast = ({
    title,
    variant = "default",
  }: {
    title: string;

    variant?: "default" | "destructive";
  }) => {
    const toastElement = document.createElement("div");
    toastElement.className = `fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-md shadow-lg bg-green-500 text-white ${
      variant === "destructive"
        ? "bg-red-500 text-white"
        : "bg-green-500 text-white"
    }`;
    toastElement.innerHTML = `<strong>${title}</strong>`;
    document.body.appendChild(toastElement);

    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 5000);
  };

  return { toast };
}
