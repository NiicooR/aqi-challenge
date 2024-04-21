import { AirQualityDataType } from "../contexts/air-quality-context";
import "./air-quality-card.css";
import { AttributePill } from "./attribute-pill";
import { ForecastCard } from "./forecast-card";
export const AirQualityCard = ({ data }: { data: AirQualityDataType }) => {
  const dominentValue = data.iaqi[data.dominentpol].v;

  return (
    <section className="card-section">
      <h1>{`AQI ${dominentValue} ${data.dominentpol}`}</h1>
      <h2>More info</h2>
      <article className="feed-data">
        {Object.entries(data.iaqi).map(([key, value]) => (
          <AttributePill
            key={key}
            attributeKey={key}
            attributeValue={value.v}
          />
        ))}
      </article>
      <h2>Forecast</h2>
      <ForecastCard forecast={data.forecast} />
    </section>
  );
};
