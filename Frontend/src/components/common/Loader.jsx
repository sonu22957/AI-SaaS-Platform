import { LoaderCircle } from "lucide-react";

export default function Loader({
    text = "Loading...",
    fullScreen = false,
}) {
    return (
        <div
            className={`app-loader ${
                fullScreen ? "app-loader-fullscreen" : ""
            }`}
            role="status"
            aria-live="polite"
        >
            <LoaderCircle
                size={36}
                className="app-loader-icon"
            />

            <p>{text}</p>
        </div>
    );
}