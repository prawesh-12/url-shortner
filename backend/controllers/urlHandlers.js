const { nanoid } = require("nanoid");
const URL = require("../models/schemaURL");

function isValidURL(string) {
    try {
        const url = new global.URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}

async function handleGenerateNewShortURL(req, res) {
    try {
        const body = req.body;
        if (!body.url) {
            return res.redirect("/?error=URL is required");
        }

        if (!isValidURL(body.url)) {
            return res.redirect(
                "/?error=Please enter a valid URL (must start with http:// or https://)",
            );
        }

        const shortID = nanoid(8);
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitedHistory: [],
        });

        return res.redirect(`/?newId=${shortID}`);
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.redirect("/?error=Something went wrong. Please try again.");
    }
}

async function handleGetURLById(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            {
                shortId,
            },
            {
                $push: {
                    visitedHistory: { timestamp: Date.now() },
                },
            },
        );

        if (!entry) {
            return res
                .status(404)
                .send(
                    "<h1>404 - Short URL not found</h1><p><a href='/'>Go back home</a></p>",
                );
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error redirecting:", error);
        return res
            .status(500)
            .send("<h1>Server Error</h1><p><a href='/'>Go back home</a></p>");
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({
            totalClicks: result.visitedHistory.length,
            analytics: result.visitedHistory,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json({ error: "Server error" });
    }
}

async function handleDeleteURL(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOneAndDelete({ shortId });

        if (!result) {
            return res.redirect("/?error=URL not found");
        }

        return res.redirect("/?success=URL deleted successfully");
    } catch (error) {
        console.error("Error deleting URL:", error);
        return res.redirect("/?error=Failed to delete URL");
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetURLById,
    handleGetAnalytics,
    handleDeleteURL,
};
