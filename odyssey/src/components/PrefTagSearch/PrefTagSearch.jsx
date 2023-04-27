import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, Button } from 'react-bootstrap';
import './PrefTagSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMinus, faTimes, faPlus, faTags, } from '@fortawesome/free-solid-svg-icons';

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
        { id: 1, label: 'tag1', value: 'tag1' },
        { id: 2, label: 'tag2', value: 'tag2' },
        { id: 3, label: 'Restaurants', value: 'Restaurants' },
    ];

    useEffect(() => {
        //notify parent component when selected tags are updated: 
        onUpdate(selectedTags);
        setTags(tagsData);
        //the [title, selectedTag] is a dependency array for the useEffect hook
        // useEffect hook is called when the dependencies' state changes (title and selectedTags are the dep.) 
      }, [title, selectedTags]);


    //set search bar to initial state (not visible): 
    const toggleSearch = () => {
        //setSearchVisible = !searchVisible;
        setSearchVisible(prevSearchVisible => !prevSearchVisible);
    };

    //function to add tags to the card component
    const addTag = (tag) => {
        if (!selectedTags.includes(tag)) {
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

    return (
        <PrefTagSearchWrapper>
        <div className="tag-search card">

            <div className="card-header" style={{ textAlign: 'left' }}>{title} Preferences</div>

            {searchVisible && (
                <div className="row-container">
                    <Select
                        options={tags}
                        onChange={selectedOption => addTag(selectedOption.value)}
                        isSearchable
                        placeholder="Select a tag"
                        /* allow searchbar to stretch to rem. width  */
                        /* styles={{ container: (base) => ({ ...base, flexGrow: 1}) }} */
                        styles={{
                            container: (base) => ({ ...base, flexGrow: 1, margin: '8px' }),
                          }}
                    />

                    <div style={{backgroundColor: 'transparent'}}>
                        <Button className='button' onClick={saveTags}>Save Tags</Button>
                    </div>
                </div>
            )}

            <div className='row-container'>
                
                <div className="selected-tags">
                    {selectedTags.map(tag => (

                        <span key={tag} className="tag">
                            {tag}
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


        </div>
        </PrefTagSearchWrapper>
    )

}

//This adds the padding so that the component doesn't take up the whole page's width
//also has a max width set 
const PrefTagSearchWrapper = ({ children }) => (
    <div className="pref-tag-search-wrapper">{children}</div>
  );
  

export default PrefTagSearch;

