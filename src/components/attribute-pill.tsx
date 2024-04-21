import "./attribute-pill.css";

export const AttributePill = ({
  attributeKey,
  attributeValue,
}: {
  attributeKey: string;
  attributeValue: number;
}) => {
  return (
    <div className="attribute">
      <div className="attribute-key">{attributeKey}</div>
      <div className="attribute-value">{attributeValue}</div>
    </div>
  );
};
