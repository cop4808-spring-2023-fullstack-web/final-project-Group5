import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, Button, Form, Card } from 'react-bootstrap';
import './PrefTagSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMinus, faTimes, faPlus, faTags, } from '@fortawesome/free-solid-svg-icons';
//import { BiSearch, BiMinus, BiX, BiPlus, BiTag } from 'react-icons/bi';
import Select from 'react-select';



/* 
PrefTagSearch Component
Props: 
- title: for the card's title
- onUpdate: callback function that gets triggered when selectedTags are updated. 
            this notifies the parent component when tags are updated.
            is called in the addTag and removeTag functions. 
*/
const PrefTagSearch = ({ title, onUpdate }) => {
    //initial state for tags in the searchbar
    const [tags, setTags] = useState([]);
    //initial state for tags that are selected/showing on the card component
    const [selectedTags, setSelectedTags] = useState([]);
    //initial state for hiding search bar. set to false
    const [searchVisible, setSearchVisible] = useState(false);

    //example object that holds tag data: 
    const tagsData = [
        { id: 1, label: "tag1", value: "tag1" },
        { id: 2, label: 'tag2', value: 'tag2' },
        { id: 3, label: 'Restaurants1', value: 'Restaurants1' },
    ];

    useEffect(() => {
        //notify parent component when selected tags are updated: 
        onUpdate(selectedTags);
        setTags(tagsData);
        tags.map(tag => console.log(tag.label));
        fetchCategories();
        tags.map(tag => console.log(tag.label));
        //setTags(tagsData);



        //the [title, selectedTag] is a dependency array for the useEffect hook
        // useEffect hook is called when the dependencies' state changes (title and selectedTags are the dep.) 
    }, [title, selectedTags]);


    //set search bar to initial state (not visible): 
    const toggleSearch = () => {
        //setSearchVisible = !searchVisible;
        setSearchVisible(prevSearchVisible => !prevSearchVisible);
    };

    //function to add tags to the card component
    /*     const addTag = (tag) => {
            if (!selectedTags.includes(tag)) {
                setSelectedTags([...selectedTags, tag]);
            }
        }; */
    // Change addTag to check and store the whole tag object instead of just the value
    const addTag = (tag) => {
        // Check if tag object already exists in selectedTags
        if (!selectedTags.find(t => t.value === tag.value)) {
            // If not, add the entire tag object to selectedTags
            setSelectedTags([...selectedTags, tag]);
        }
    };
    // function to remove tags from card 
    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
        //TODO: might have to remove the tag data from an array or something later
    };

    const saveTags = () => {
        //TODO: add code to save the tag data to an array or something
        //
        //hide the searchbar once tags are saved
        toggleSearch();
    };

    const fetchCategories = async() => {
        try {
            const endpoint = 'rest';
            const response = await axios.get(`http://localhost:8000/auto/${endpoint}`, {
                timeout: 5000
            });
            const categories = response.data.terms;
    
            // Create a new array with categories prepended to tagsData
            const newTagsData = [
                // Map each category (which is now an object) to a new tag object
                ...categories.map((category, index) => ({
                    id: `category-${index}`,
                    label: category.text, // Here we access the 'text' property of the category
                    value: category.text // And here as well
                })),
                ...tagsData
            ];
    
            setTags(newTagsData);
        } catch(error) {
            console.error(error);
        }
    };
    


    return (
        <Card className='p-4 w-[600px]'>


            <Card.Title className="card-header" style={{ textAlign: 'left' }}>{title} Preferences</Card.Title>
            {searchVisible && (
                <div className="row-container">
                    <Select
                        options={tags}
                        onChange={selectedOption => addTag(selectedOption)}
                        isSearchable
                        placeholder="Select Search Filters"
                    /* allow searchbar to stretch to rem. width  */
                    /* styles={{ container: (base) => ({ ...base, flexGrow: 1}) }} */

                    />

                    <div style={{ backgroundColor: 'transparent' }}>
                        <Button className='button' onClick={saveTags}>Save</Button>
                    </div>
                </div>
            )}

            <div className='row-container'>


                <div className="selected-tags">
                    {selectedTags.map(tag => (
                        <span key={tag.value} className="tag">
                            {tag.label}
                            <FontAwesomeIcon icon={faTimes} onClick={() => removeTag(tag)} />
                        </span>
                    ))}
                </div>



                {!searchVisible ? (
                    <div className='add-filters-container' onClick={toggleSearch} >

                        <div className="tag">
                            <FontAwesomeIcon icon={faPlus} />
                            <FontAwesomeIcon icon={faTags} />
                        </div>
                    </div>
                ) : null}


            </div>


        </Card>
    )

}

export default PrefTagSearch;

