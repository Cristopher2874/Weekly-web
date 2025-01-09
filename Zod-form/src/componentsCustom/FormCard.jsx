import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormSchema } from "../../schemas/exampleSchema";
import { pageSchema } from "../../schemas/pageSchema";
import { useNavigate } from "react-router-dom";
import { questions1,questions2 } from "./FormBase";

const FormCard = () => {
    const allPages=[questions2, questions1, questions2];
    const allSchemas=[pageSchema, clientFormSchema, pageSchema];

    const navigate = useNavigate();

    // Initialize state with localStorage data if exists
    const [currentPage, setCurrentPage] = useState(() => {
        const saved = localStorage.getItem('currentPage');
        return saved ? JSON.parse(saved) : 1;
    });

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('formData');
        return saved ? JSON.parse(saved) : {};
    });

    // Update localStorage when state changes
    useEffect(() => {
        localStorage.setItem('currentPage', JSON.stringify(currentPage));
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [currentPage, formData]);

    const [questionsList, setQuestionsList] = useState(allPages[0]);
    const [schema, setSchema] = useState(allSchemas[0]);

    // Clear storage on form completion
    const handleFormComplete = () => {
        localStorage.removeItem('currentPage');
        localStorage.removeItem('formData');
        navigate('/home');
    };

    //ZOD validation
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    //function to prev button load the previous page
    const handlePrevious = () => {
        if (currentPage > 1) {
            const prevIndex = currentPage - 2;
            setQuestionsList(allPages[prevIndex]);
            setCurrentPage(prevPage => prevPage - 1);
            setSchema(allSchemas[prevIndex]);
        }
    };

    const handleNext = async (event) => {
        event.preventDefault();

        const isValid = await trigger();

        if ( isValid && currentPage <= allPages.length) {
            const nextIndex = currentPage;
            setQuestionsList(allPages[nextIndex]);
            if(currentPage!=allPages.length){
                setCurrentPage(prevPage => prevPage + 1);
            }else{
            }
            setSchema(allSchemas[nextIndex]);
        }
    };

    const onSubmit = async (data) => {
        try {
            setFormData(prev => ({ ...prev, ...data }));

            if(currentPage===allPages.length){
                handleFormComplete();
                return;
            }
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };
    
    const totalPages = allPages.length;
    const progress = (currentPage / totalPages) * 100;
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black bg-white flex justify-center flex-col p-4 w-2/3 h-full">
            {questionsList.map((question) => (
                <div key={question.id} className="p-2 flex flex-col">
                    <label className="mr-1.5">{question.label}:</label>
                    {question.type === "text" || question.type === "email" ? (
                        <>
                            <input
                                type={question.type}
                                placeholder={question.placeholder}
                                {...register(question.label.toLowerCase(), { required: question.required })}
                                className="bg-slate-400 rounded p-1"
                            />
                            {errors[question.label.toLowerCase()] && <p className="text-red-500">{errors[question.label.toLowerCase()].message}</p>}
                        </>
                    ) : question.type === "textarea" ? (
                        <>
                            <textarea
                                placeholder={question.placeholder}
                                {...register(question.label.toLowerCase(), { required: question.required })}
                                className="bg-slate-400 rounded p-1"
                            ></textarea>
                            {errors[question.label.toLowerCase()] && <p className="text-red-500">{errors[question.label.toLowerCase()].message}</p>}
                        </>
                    ) : question.type === "select" ? (
                        <>
                            <select {...register(question.label.toLowerCase(), { required: question.required })} className="bg-slate-400 rounded p-1">
                                {question.options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                            {errors[question.label.toLowerCase()] && <p className="text-red-500">{errors[question.label.toLowerCase()].message}</p>}
                        </>
                    ) : question.type === "radio" ? (
                        <>
                            {question.options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        value={option}
                                        {...register(question.label.toLowerCase(), { required: question.required })}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                            {errors[question.label.toLowerCase()] && <p className="text-red-500">{errors[question.label.toLowerCase()].message}</p>}
                        </>
                    ) : question.type === "checkbox" ? (
                        <>
                            {question.options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        {...register(question.label.toLowerCase())}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                            {errors[question.label.toLowerCase()] && <p className="text-red-500">{errors[question.label.toLowerCase()].message}</p>}
                        </>
                    ) : null}
                </div>
            ))}
            <div className="flex flex-row justify-between p-3 mt-6 items-center">
                {progress === 100 ? (
                    <>
                        <button type="button" onClick={handlePrevious} className="bg-orange-600 rounded-md p-2 text-white w-20 text-center">Previous</button>
                        <button className="bg-orange-600 rounded-md p-2 text-white w-20 text-center" type="submit">Submit</button>
                    </>
                ) : currentPage === 1 ? (
                    <>
                        <button onClick={(event) => {handleNext(event)}} className="bg-orange-600 rounded-md p-2 text-white w-20 text-center" type="button">Next</button>
                    </>
                ) : (
                    <>
                        <button type="button" onClick={handlePrevious} className="bg-orange-600 rounded-md p-2 text-white w-20 text-center">Previous</button>
                        <button type="button" onClick={(event) => {handleNext(event)}} className="bg-orange-600 rounded-md p-2 text-white w-20 text-center">Next</button>
                    </>
                )}
                <div className="w-1/3 bg-gray-300 rounded-full h-3 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-700">Page {currentPage} of {totalPages}</p>
            </div>
        </form>
    );
}

export default FormCard;