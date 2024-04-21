import { FormattedForecast } from "../contexts/air-quality-context";
import { AttributePill } from "./attribute-pill";
import "./forecast-card.css";

export const ForecastCard = ({ forecast }: { forecast: FormattedForecast }) => {
  return (
    <article className="forecast-container">
      {Object.entries(forecast).map(([k, v]) => {
        return (
          <div key={k} className="forecast-card">
            <p className="forecast-title">{k}</p>
            <div className="pill-container">
              {Object.entries(v).map(([att, dailyForecast]) => {
                return (
                  <AttributePill
                    key={att}
                    attributeKey={att}
                    attributeValue={dailyForecast.avg}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </article>
  );
};
