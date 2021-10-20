import { useEffect, useRef, useState } from 'react';
import { User } from '../../types/users';
import { Photo } from '../../types/photo';
import { Loader } from '../loader';
import './search.css';
import { getPhotos, getUsers } from '../../api';

export const Search = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState<User[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [focusIndex, updateFocusIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const ITEM_HEIGHT = 56;

    enum Keys{
        ENTER = "Enter",
        UP = "ArrowUp",
        DOWN = "ArrowDown"
    };

    const onSuggestHandler = (name:string) => {
        setText(name);
        setSuggestions([]);
    }

    const loadData = async () => {
        setIsLoading(true);
        const usersResponse:User[] = await getUsers();
        setUsers(usersResponse);
        const photosResponse:Photo[] = await getPhotos();
        setPhotos(photosResponse);
        setIsLoading(false);
    }
    const cleanup = () =>{
        setIsLoading(false);
        setUsers([]);
        setPhotos([]);
    }

    useEffect(() => {
        loadData();
        return () => {
            cleanup();
          };
    },[suggestions])

    const onChangeHandler = (text:string) =>  {
       
        let matches:User[] = []
        if (text.length > 0) {
            matches = users.filter(user => {
            const regex = new RegExp(`${text}`, "gi");
            return user.name.match(regex);
            })
        }
        setSuggestions(matches)
        setText(text)
        setIsLoading(false);
        
    }

    const handleNavigation = (code: string) => {
        console.log(code);
        switch (code) {
            case Keys.ENTER:{
                onSuggestHandler(suggestions[focusIndex].name)
            }
            break;
            case Keys.UP:
                if (focusIndex > 0) {
                console.log(focusIndex);
                scrollRef.current  && (scrollRef.current as unknown as HTMLDivElement).scrollBy(0, -ITEM_HEIGHT);
                updateFocusIndex(focusIndex - 1);
                }
            break;
            case Keys.DOWN:
                if (focusIndex < suggestions.length - 1) {
                console.log(focusIndex);
                scrollRef.current  && (scrollRef.current as unknown as HTMLDivElement).scrollBy(0, ITEM_HEIGHT);  
                updateFocusIndex(focusIndex + 1);
                }
            break;
        }
    };

    return <div className="search">
        <input type="text" className="search-input"
            placeholder = "&#xF002; Search"
            onChange={e => onChangeHandler(e.target.value)}
            value={text}
            onKeyDown={e => handleNavigation(e.code)}
        />
        <div  className={`search-results ${isLoading ? 'search-results__loading' : ''}`}
        ref={scrollRef}>
            {isLoading && <Loader/>}
            {!isLoading && suggestions && suggestions.map((suggestion, i) => <div key = {suggestion.id} 
            className={`search-result ${focusIndex === i ? 'active' : ""}`}
            onClick={() => onSuggestHandler(suggestion.name)}
            onBlur={() => setSuggestions([])}
            onMouseMove ={()=> updateFocusIndex(i)}
            onWheel = {() => updateFocusIndex(i)}
            data-testid = "result"
            >
                <img className = "search-image" style ={{width: "30px", height:"30px"}}
                src={`${photos.find(photo => photo.id === suggestion.id)?.url }`} alt = "photo"/>
                <span>{suggestion.name}</span>
            </div> 
            )}
        </div>
    </div>
}
