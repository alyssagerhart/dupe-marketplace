import React from "react";
import "./SuggestForm.css";

function SuggestForm() {
    return (
        <div className="bri">
            <div className='span-3'>
            <form>
                <label for="category">Brand Name Item:</label>
                    <select id="category" name="category">
                        <option value="">--Please select a category--</option>
                        <option value="Leggings">Leggings</option>
                        <option value="Make-up">Make-up</option>
                        <option value="Perfume">Perfume</option>
                    </select>
                <label for="name">Name:</label>
                    <input type="text" id="name" name="name"></input>
                <label for="photos">Photos:</label>
                    <input type="file" id="photos" name="photos" accept="image/*" multiple></input>

                 <label for="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                    <input type="submit" value="Submit"></input>
            </form>
            <form>
                <label for="category">Dupe:</label>
                    <select id="category" name="category">
                        <option value="">--Please select a category--</option>
                        <option value="Leggings">Leggings</option>
                        <option value="Make-up">Make-up</option>
                        <option value="Perfume">Perfume</option>
                    </select>
                <label for="name">Name:</label>
                    <input type="text" id="name" name="name"></input>
                <label for="photos">Photos:</label>
                    <input type="file" id="photos" name="photos" accept="image/*" multiple></input>

                 <label for="description">Description:</label>
                    <textarea id="description" name="description"></textarea>

                
                    <input type="submit" value="Submit"></input>
            </form>
        </div>
    </div>
    )
}
export default SuggestForm;

