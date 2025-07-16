import useSWR from "swr";
import React, { useEffect, useState } from "react";
import Bowl from "../assets/fruit-bowl.jpg";
import Trash from "../assets/trash.svg";
import Watermelon from "../assets/watermelon-404.jpg";
import { editItem, removeItem } from "../services/items";

const DEBOUNCE_TIMEOUT = 5000;

const fetcher = (url) => fetch(url).then((res) => res.json());

export const ItemGrid = () => {
    const [timer, setTimer] = useState(-1);
    const [changes, setChanges] = useState({
        id: null,
        name: null,
        // TODO: support batch changes (and deletions!)
    });
    const { data, err, loading } = useSWR(
        "http://localhost:3777/items", 
        fetcher,
        {
            refreshInterval: 5000
        }
    );

    // Debounce editing
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => prev > 0 ? prev - 1000 : prev);
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    // Then fire the edit event 
    if (timer === 0) {
        editItem(changes.id, changes.name);
        setChanges({ id: null, name: null });
        setTimer(-1);
    }

    if (err) {
        return (
            <div>
                <img src={Watermelon} alt="A 404 message with the 0 replaced by a watermelon." className="h-auto max-w-full rounded-md" />
            </div>
        )
    }
    if (loading) {
        return (
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        )
    }

    // Debounce helper functions 
    const showToast = () => {
        document.getElementById('warning-toast').classList.remove("hidden");

        setTimeout(() => {
            document.getElementById('warning-toast').classList.add("hidden");
        }, 5000);
    }

    const debounceEditing = (id, name) => {
        if (changes.id && changes.id !== id) {
            showToast();
        } else {
            setChanges({ id: id, name: name });
            setTimer(DEBOUNCE_TIMEOUT);
        }
    }

    return (
        <div className='grid grid-cols-4 grid-rows-2 gap-5 mt-2 ml-3 mr-3'>
            {data?.items?.map((item) =>
                <div key={item.id} class="relative flex text-center">
                    <img src={Bowl} alt="A fruit bowl." className="h-auto max-w-full rounded-md" />
                    {/* TODO: Spinner while deleting */}
                    <img src={Trash} alt="A trash icon." onClick={(e) => removeItem(item.id)} class="relative max-w-[20%] h-3 -bottom-[85%] right-[10%]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12" />
                    <input type="text" onChange={(e) => debounceEditing(item.id, e.target?.value)} id="fruit_name" class="absolute bottom-3 left-2 max-w-[80%] bg-gray-50 border border-gray-300 text-slate-700 placeholder-slate-500 text-sm rounded-lg block p-1.5" placeholder={item.name} />
                </div>
            )}
            <div id="warning-toast" class={"hidden fixed right-[40%] bottom-10 max-w-xs p-4 text-white bg-gray-500 rounded-lg"}>
                <p class="text-sm ms-3 font-normal">
                    ! Changes pending!
                </p>
            </div>
        </div>
    );
}