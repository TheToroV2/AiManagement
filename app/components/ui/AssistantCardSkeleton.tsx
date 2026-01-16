import Skeleton from "./Skeleton";

export default function AssistantCardSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <Skeleton width="60%" height={24} style={{ marginBottom: 12 }} />
        <Skeleton width="40%" height={16} style={{ marginBottom: 8 }} />
        <Skeleton width="35%" height={16} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Skeleton width={80} height={32} borderRadius={4} />
        <Skeleton width={80} height={32} borderRadius={4} />
      </div>
    </div>
  );
}
