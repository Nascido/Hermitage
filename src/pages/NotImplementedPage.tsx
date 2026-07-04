import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HermitageTopbar from "../components/shared/HermitageTopbar";

export default function NotImplementedPage() {
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  useEffect(() => {
    if (secondsRemaining === 0) {
      navigate("/", { replace: true });
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setSecondsRemaining((seconds) => seconds - 1);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [navigate, secondsRemaining]);

  return (
    <>
      <HermitageTopbar />
      <main className="not-implemented-page" aria-live="polite">
        <section className="not-implemented-message" aria-label="Tela nao implementada">
          <div className="not-implemented-spinner" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <h1>Essa tela não foi implementada</h1>
          <p>Você será redirecionado para a HomePage em {secondsRemaining}s</p>
        </section>
      </main>
    </>
  );
}
