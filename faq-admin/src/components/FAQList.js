import React, { useEffect, useState } from "react";
import { getFAQs, deleteFAQ } from "../api/faqService";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const FAQList = ({ onEdit }) => {
  const [faqs, setFAQs] = useState([]);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const data = await getFAQs();
      setFAQs(data);
    } catch (error) {
      toast.error("Error fetching FAQs");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFAQ(id);
      fetchFAQs();
      toast.success("FAQ deleted");
    } catch (error) {
      toast.error("Error deleting FAQ");
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {faqs.map((faq) => (
          <tr key={faq._id}>
            <td>{faq.question}</td>
            <td>{faq.answer}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(faq)}>
                Edit
              </Button>
              &nbsp;
              <Button variant="danger" onClick={() => handleDelete(faq._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FAQList;
