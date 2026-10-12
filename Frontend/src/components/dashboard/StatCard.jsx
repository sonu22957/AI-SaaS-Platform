import "./StatCard.css";

export default function StatCard({
    title,
    value = 0,
    change,
    icon: Icon,
    color = "purple",
    description,
}) {
    return (
        <div className="stat-card">
            <div className="stat-card-top">
                <div>
                    <p className="stat-card-title">{title}</p>
                    <h2 className="stat-card-value">{value}</h2>
                </div>

                {Icon && (
                    <div className={`stat-card-icon stat-card-${color}`}>
                        <Icon size={23} />
                    </div>
                )}
            </div>

            {(change || description) && (
                <div className="stat-card-footer">
                    {change && (
                        <span className="stat-card-change">
                            {change}
                        </span>
                    )}

                    {description && (
                        <span className="stat-card-description">
                            {description}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}