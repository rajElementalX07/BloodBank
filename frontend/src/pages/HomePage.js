import React, { useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className="mb-3 bg-transparent border-light shadow-sm"
      style={{ color: "#FFD700" }}
    >
      <Card.Header
        onClick={() => setIsOpen(!isOpen)}
        className="d-flex justify-content-between align-items-center bg-transparent border-light"
        style={{
          cursor: "pointer",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <span className="fw-bold">{question}</span>
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </Card.Header>
      {isOpen && (
        <Card.Body className="bg-transparent">
          <Card.Text style={{ color: "#FFD700" }}>{answer}</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
}

function HomePage() {
  const faqItems = [
    {
      question: "What is LifeLine?",
      answer:
        "LifeLine is a revolutionary platform that connects blood donors with receivers, ensuring every drop counts. Our mission is to save lives by bridging the gap between those who can help and those who need help.",
    },
    {
      question: "How do I register as a donor?",
      answer:
        "Registering as a donor is simple. Click on the registration link, fill out the donor-specific form, and join our community of lifesavers.",
    },
    {
      question: "How do I request blood?",
      answer:
        "If you need blood, register as a receiver and complete the blood request form with your details. Our system will help match you with available donors near you.",
    },
  ];

  return (
    <Container
      fluid
      className="py-5 "
      style={{
        minHeight: "100vh",
        color: "#FFD700",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Row className="justify-content-center text-center">
        <Col
          md={10}
          // data-aos="zoom-in"
          // data-aos-duration="500"
          // data-aos-delay="300"
        >
          <h1 className="display-2 fw-bold">Welcome to LifeLine</h1>
          <p className="lead mt-4 fw-bold">
            Connecting lives and saving lives – one donation at a time.
          </p>
          <p className="fs-5 fw-bold">
            Join our community of heroes. Whether you're a donor or in need,
            LifeLine bridges the gap to provide timely help when it matters
            most.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h2 className="text-center mb-4 ">Frequently Asked Questions</h2>
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
