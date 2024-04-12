import {useEffect, useState} from "react";
import {formatDate} from "../../utils/dateUtils";
import {useLocation, useParams} from "react-router-dom";
import {getPageTitleAndLink} from "../../utils/navigationUtils";

export const useMainContainer = (lang, t) => {
    const [pathHistory, setPathHistory] = useState(["/"]);
    const location = useLocation();
    const {productId, receiptNumber} = useParams();
    const formattedDate = formatDate(lang);

    useEffect(() => {
        setPathHistory((prevState) => [...prevState, location.pathname]);
    }, [location.pathname]);

    const {pageTitle, prevLink} = getPageTitleAndLink(location.pathname, t, productId, receiptNumber, pathHistory);
    return {
        formattedDate,
        pageTitle,
        prevLink
    };
};

