import React from 'react'
import { Container, Row, Col, Card, ListGroup, Nav } from 'react-bootstrap';

export default function CommunityPage() {
  return (
    <Container fluid>
      <Row>
        {/* Left Side - Quick Links */}
        <Col sm={3} className="bg-light border-right">
          <Nav defaultActiveKey="/trending" className="flex-column mt-3">
            <Nav.Link href="/trending">Trending</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/announcements">Announcements</Nav.Link>
            <Nav.Link href="/faq">FAQs</Nav.Link>
            {/* Add more quick links as needed */}
          </Nav>
        </Col>

        {/* Right Side - Community Posts */}
        <Col sm={9} className="mt-3">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Post Title 1</Card.Title>
              <Card.Text>
                This is a sample post content. You can customize it based on your requirements.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
