require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.post("/api/submit", async (req, res) => {
    const { company, email, phone, division } = req.body;

    try {
        // Insert data into a table named 'leads'
        const { data, error } = await supabase
            .from("leads")
            .insert([
                {
                    company_name: company,
                    email: email,
                    phone: phone,
                    division: division,
                },
            ]);

        if (error) throw error;

        res.status(200).json({ message: "Success", data });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Submission failed" });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
