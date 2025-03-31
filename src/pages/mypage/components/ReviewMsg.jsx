import React from "react";
import {useTranslation} from "react-i18next";

const ReviewMsg = ({rating}) => {
    const { t } = useTranslation();
    const ratingToMessage = (value) => {
        switch (value) {
            case 0.5:
                return t('version2_4.text40')
            case 1:
                return t('version2_4.text41')
            case 1.5:
                return t('version2_4.text42')
            case 2:
                return t('version2_4.text43')
            case 2.5:
                return t('version2_4.text44')
            case 3:
                return t('version2_4.text45')
            case 3.5:
                return t('version2_4.text46')
            case 4:
                return t('version2_4.text47')
            case 4.5:
                return t('version2_4.text48')
            case 5:
                return t('version2_4.text49') ;
            default:
                return '';
        }
    }

    return (
        <strong>{ratingToMessage(rating)}</strong>
    )
}

export default ReviewMsg