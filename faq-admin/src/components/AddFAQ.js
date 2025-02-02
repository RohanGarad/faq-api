import React, { useState } from "react";
import { createFAQ, updateFAQ } from "../api/faqService";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AddFAQ = ({ faqToEdit, refreshFAQs, clearEdit }) => {
  const [faq, setFaq] = useState(faqToEdit || { question: "", answer: "" });

  const handleChange = (e) => {
    setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (faq._id) {
        await updateFAQ(faq._id, faq);
        toast.success("FAQ updated!");
      } else {
        await createFAQ(faq);
        toast.success("FAQ added!");
      }
      refreshFAQs();
      clearEdit();
    } catch (error) {
      toast.error("Error saving FAQ");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          name="question"
          value={faq.question}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Answer</Form.Label>
        <Form.Control
          as="textarea"
          name="answer"
          value={faq.answer}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {faq._id ? "Update FAQ" : "Add FAQ"}
      </Button>
    </Form>
  );
};

export default AddFAQ;
