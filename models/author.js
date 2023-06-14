const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const schema = mongoose.Schema;

const AuthorSchema = new schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullName = "";
  if (this.first_name && this.family_name) {
    fullName = `${this.family_name}, ${this.first_name}`;
  }

  return fullName;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan").get(function () {
  function formatDate(date) {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
  }

  if (!this.date_of_birth && !this.date_of_death) {
    return "no data";
  }
  if (this.date_of_birth && !this.date_of_death) {
    return `Born: ${formatDate(this.date_of_birth)}`;
  }
  if (this.date_of_birth && this.date_of_death) {
    return `Born: ${formatDate(this.date_of_birth)} Died: ${formatDate(
      this.date_of_death
    )}`;
  }
});

AuthorSchema.virtual("formatted_dob").get(function () {
  if (this.date_of_birth) {
    return DateTime.fromJSDate(this.date_of_birth).toISODate();
  }
});

AuthorSchema.virtual("formatted_dod").get(function () {
  if (this.date_of_death) {
    return DateTime.fromJSDate(this.date_of_death).toISODate();
  }
});

module.exports = mongoose.model("Author", AuthorSchema);
