import React from "react";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex mt-1">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={(e) => onCheckboxChange("male")}
          />
          <span className="label-text">Male</span>
        </label>
      </div>

      <div className="form-control ml-6">
        <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={(e) => onCheckboxChange("female")}
          />
          <span className="label-text">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
