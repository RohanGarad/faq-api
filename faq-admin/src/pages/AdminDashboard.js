import React, { useState } from "react";
import FAQList from "../components/FAQList";
import AddFAQ from "../components/AddFAQ";
import { Container, Row, Col } from "react-bootstrap";

const AdminDashboard = () => {
  const [faqToEdit, setFaqToEdit] = useState(null);

  return (
    <Container>
      <h2>FAQ Admin Panel</h2>
      <Row>
        <Col md={6}>
          <AddFAQ faqToEdit={faqToEdit} refreshFAQs={() => window.location.reload()} clearEdit={() => setFaqToEdit(null)} />
        </Col>
        <Col md={6}>
          <FAQList onEdit={(faq) => setFaqToEdit(faq)} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
