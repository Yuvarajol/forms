import React, { useState } from "react";

import "./PlayerPreferenceSurvey.css";
import blackLogo from "./black.png";
// ...


const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TIMES = [
  "00:00 - 03:00",
  "03:00 - 06:00",
  "06:00 - 09:00",
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
  "21:00 - 24:00",
];

const TURFS = [
  "Turf One 27", "Tiki Taka Velachery", "Kick N Scream Football Academy",
  "SSS Multi Sports Hub", "Strikerz Turf", "Turf 137", "Turf 360 Sports Academy",
  "Namma Turf 91", "Soccer Nation Football Turf", "Spark Turf", "GO Futsal (Velachery)",
  "Drive & Dash Turf", "Boundary Blitz Turf", "FC Marina Turf", "Soccer Zone Football Turf",
  "FC Meena Turf", "Soccer Kingdom Football Turf", "Masters Indoor Turf", "T3 Turf",
  "RSD Sports Guindy", "H & M Multi Sports Turf", "Counter Attack",
];

const SPEND_OPTIONS = [
  "Less than ₹500", "₹500 – ₹1,000", "₹1,001 – ₹2,000", "₹2,001 – ₹3,000",
  "₹3,001 – ₹5,000", "More than ₹5,000", "Not sure",
];

const GROUP_SIZES = ["5–7 players", "8–10 players", "11–15 players", "16–20 players", "More than 20 players"];

const API_URL = "https://script.google.com/macros/s/AKfycbytfqfpXAPIjPg6s3KRhBITXDH7e1KhBwEMoOom86pHqI7RpXuvSZ6Vnfa2tem-jRVN/exec"; // adjust if backend is on a different host

const initialState = {
  full_name: "",
  mobile_number: "",
  sport: "",
  playing_day: [],
  playing_time: [],
  turf: [],
  monthly_spend: "",
  group_size: "",
  suggestions: "",
  share_more_info: "",
  location: "",
  instagram_link: "",
  gender: "",
  profession: "",
};



export default function PlayerPreferenceSurvey() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const toggleArrayField = (field, value) => {
    setForm((prev) => {
      const set = new Set(prev[field]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [field]: Array.from(set) };
    });
  };

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const validate = () => {
    

    if (!form.mobile_number.trim())
      return "Mobile Number is required";

    if (!form.sport)
      return "Please select which sport you usually play";

    if (form.playing_day.length === 0)
      return "Please select at least one Preferred Playing Day";

    if (form.playing_time.length === 0)
      return "Please select at least one preferred playing time";

    if (!form.monthly_spend)
      return "Please select monthly turf spend";

    if (!form.suggestions.trim())
      return "Please add a suggestion (or write N/A)";

    if (!form.share_more_info)
      return "Please answer the last question";

    if (
      form.share_more_info ===
        "Yes, I'd like to share more information" &&
      (
        !form.location ||
        !form.gender ||
        !form.profession
      )
    ) {
      return "Please complete the additional information section";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ state: "error", message: err });
      return;
    }
    setStatus({ state: "loading", message: "" });
    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } catch (e2) {
      setStatus({
        state: "error",
        message: e2.response?.data?.error || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="survey-page">
      <div className="survey-container">
        
        <header className="survey-header">
          {/* <span className="survey-badge">Player Survey</span> */}
         <img src={blackLogo} alt="Dugout Sports" className="survey-logo" />
          {/* <img
            src="black.png"
            alt="Dugout Sports"
            className="survey-logo"
          /> */}
          <h1 className="survey-title"> Dugout Sports – Player Preference Survey</h1>
          <p className="survey-subtitle">
            Thank you for being a valued Dugout Sports customer. We want to provide better playing
            experiences, tournament updates, special offers, and preferred slot notifications based
            on your interests. This survey takes less than 1 minute to complete.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="survey-form">
          <Card label="We Known You As ?" required>
            <input
              className="survey-input"
              value={form.full_name}
              onChange={(e) => setField("full_name", e.target.value)}
              placeholder="Enter your full name"
            />
          </Card>
          

          <Card label="Mobile Number" required>
            <input
              className="survey-input"
              value={form.mobile_number}
              onChange={(e) => setField("mobile_number", e.target.value)}
              placeholder="10-digit mobile number"
            />
          </Card>

          <Card label="Which sport do you usually play?" required>
            {["Cricket", "Football", "Both"].map((opt) => (
              <Radio key={opt} name="sport" value={opt} checked={form.sport === opt}
                onChange={() => setField("sport", opt)} />
            ))}
          </Card>

          <Card label="Preferred Playing Day" required hint="Select all that apply">
            {DAYS.map((d) => (
              <Checkbox key={d} label={d} checked={form.playing_day.includes(d)}
                onChange={() => toggleArrayField("playing_day", d)} />
            ))}
          </Card>

          <Card
                label="Preferred Playing Time"
                required
                hint="Select all preferred slots"
              >
                {TIMES.map((t) => (
                  <Checkbox
                    key={t}
                    label={t}
                    checked={form.playing_time.includes(t)}
                    onChange={() => toggleArrayField("playing_time", t)}
                  />
                ))}
              </Card>

          <Card label="Which football turf / sports facility do you usually play at?" hint="Optional · select all that apply">
            {TURFS.map((t) => (
              <Checkbox key={t} label={t} checked={form.turf.includes(t)}
                onChange={() => toggleArrayField("turf", t)} />
            ))}
          </Card>

          <Card label="Approximately how much do you spend on football turf bookings each month?" required>
            {SPEND_OPTIONS.map((s) => (
              <Radio key={s} name="monthly_spend" value={s} checked={form.monthly_spend === s}
                onChange={() => setField("monthly_spend", s)} />
            ))}
          </Card>

          <Card label="How many people are usually in your playing group?">
            {GROUP_SIZES.map((g) => (
              <Radio key={g} name="group_size" value={g} checked={form.group_size === g}
                onChange={() => setField("group_size", g)} />
            ))}
          </Card>

          <Card label="Any suggestions for Dugout Sports?" required>
            <textarea
              className="survey-input"
              value={form.suggestions}
              onChange={(e) => setField("suggestions", e.target.value)}
              placeholder="Tell us what we can improve..."
            />
          </Card>
          {form.share_more_info ===
              "Yes, I'd like to share more information" && (
              <Card label="Additional Information">

                <input
                  className="survey-input"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                />

                <input
                  className="survey-input"
                  placeholder="Instagram Profile Link"
                  value={form.instagram_link}
                  onChange={(e) => setField("instagram_link", e.target.value)}
                />

                <select
                  className="survey-input"
                  value={form.gender}
                  onChange={(e) => setField("gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  className="survey-input"
                  placeholder="Profession"
                  value={form.profession}
                  onChange={(e) => setField("profession", e.target.value)}
                />

              </Card>
            )}

          <Card label="Would you like to share more information about yourself?" required>
            {["Yes, I'd like to share more information", "No, I'd prefer not to"].map((opt) => (
              <Radio key={opt} name="share_more_info" value={opt} checked={form.share_more_info === opt}
                onChange={() => setField("share_more_info", opt)} />
            ))}
          </Card>

          {status.state === "error" && (
            <div className="survey-status error">{status.message}</div>
          )}
          {status.state === "success" && (
            <div className="survey-status success">{status.message}</div>
          )}
          

          <button
            type="submit"
            disabled={status.state === "loading"}
            className="survey-submit"
          >
            {status.state === "loading" ? "Submitting..." : "Submit Survey"}
          </button>

          <p className="survey-footer-note">Dugout Sports · Your responses help us serve you better</p>
        </form>
      </div>
    </div>
  );
}

function Card({ label, required, hint, children }) {
  return (
    <div className="survey-card">
      <div className="survey-card-label">
        {label} {required && <span className="survey-required">*</span>}
      </div>
      {hint && <p className="survey-hint">{hint}</p>}
      <div className="survey-options">{children}</div>
    </div>
  );
}

function Radio({ name, value, checked, onChange }) {
  return (
    <label className="survey-option-row">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      {value}
    </label>
  );
}


function Checkbox({ label, checked, onChange }) {
  return (
    <label className="survey-option-row">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
