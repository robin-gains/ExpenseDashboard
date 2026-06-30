function Notes() {
  return (
    <div className="card mt-5 mb-4">
      <div className="card-body">
        <h3>Technical Notes</h3>

        <p>
          The currency conversion logic is implemented in a
          dedicated <code>convertToUSD()</code> utility
          function inside the <code>utils</code> folder.
          Centralizing the conversion process ensures that
          all components use a consistent exchange rate
          source and prevents duplication of conversion
          calculations across the application. Components
          such as the summary dashboard and expense table
          simply call this function whenever they need a USD
          value, making the code easier to maintain and
          extend.
        </p>

        <p>
          If a 25th currency needed to be supported, only a
          new exchange rate entry would need to be added to
          the currency rates object used by the utility
          function. Since all conversions pass through the
          same function, no changes would be required in the
          user interface or business logic components.
        </p>

        <p>
          If a currency rate were missing or contained a
          null value, conversion calculations could return
          incorrect values or produce <code>NaN</code>,
          affecting totals, sorting, and summary statistics.
          To guard against this, the conversion function
          should validate that a rate exists before
          performing calculations and either return a safe
          default value or display an error message when a
          conversion cannot be completed.
        </p>
      </div>
    </div>
  );
}

export default Notes;