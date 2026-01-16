import Analytics from "../models/Analytics.model.js";

export const cleanupOldAnalytics = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  await Analytics.deleteMany({
    createdAt: { $lt: thirtyDaysAgo },
  });

  console.log("Old analytics cleaned");
};
