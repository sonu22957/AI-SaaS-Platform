import {
    Clock,
    PenTool,
    Code2,
    MessageSquare,
    ArrowRight,
    History,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./RecentActivity.css";

const activityIcons = {
    writer: PenTool,
    code: Code2,
    chat: MessageSquare,
};

export default function RecentActivity({ activities = [] }) {
    const recentActivities = activities.slice(0, 5);

    return (
        <section className="recent-activity-card">
            <div className="recent-activity-header">
                <div>
                    <h2>Recent Activity</h2>
                    <p>Your latest AI workspace activity</p>
                </div>

                <Link
                    to="/history"
                    className="recent-activity-view-all"
                >
                    View all <ArrowRight size={16} />
                </Link>
            </div>

            {recentActivities.length === 0 ? (
                <div className="recent-activity-empty">
                    <div className="recent-activity-empty-icon">
                        <History size={25} />
                    </div>

                    <h3>No activity yet</h3>

                    <p>
                        Start using your AI tools, and your recent
                        activities can appear here.
                    </p>

                    <Link
                        to="/ai-writer"
                        className="recent-activity-start"
                    >
                        Try AI Writer
                    </Link>
                </div>
            ) : (
                <div className="recent-activity-list">
                    {recentActivities.map((activity, index) => {
                        const Icon =
                            activityIcons[activity.type] || Clock;

                        return (
                            <div
                                className="recent-activity-item"
                                key={activity._id || activity.id || index}
                            >
                                <div className="recent-activity-icon">
                                    <Icon size={19} />
                                </div>

                                <div className="recent-activity-details">
                                    <h3>
                                        {activity.title ||
                                            activity.prompt ||
                                            "AI Activity"}
                                    </h3>

                                    <p>
                                        {activity.description ||
                                            activity.type ||
                                            "AI Workspace"}
                                    </p>
                                </div>

                                <span className="recent-activity-time">
                                    {activity.createdAt
                                        ? new Date(
                                              activity.createdAt
                                          ).toLocaleDateString()
                                        : "Recent"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}