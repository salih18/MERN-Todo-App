import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Card } from 'react-bootstrap';
import { useTodo, useTags } from './../../redux/hooks';

import Input from './../../atoms/Input';
import Button from './../../atoms/Button';

const Todo = ({ description, setModal }) => {
  const { addTodo, todo, loading, updateTodo } = useTodo();
  const [formData, setFormData] = useState({
    tag: !loading && description === 'Update' ? todo.tags[0].name : '',
    tagId: !loading && description === 'Update' ? todo.tags[0]._id : '',
    text: !loading && description === 'Update' ? todo.text : ''
  });

  const { getTags, tags } = useTags();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const { text, tag, tagId } = formData;

  const onChange = (e) => {
    return setFormData(
      e.target.name === 'tag' && tagId !== '5f5689a2d096a9b777ea4124'
        ? {
            ...formData,
            tagId: e.target.options[e.target.options.selectedIndex].getAttribute(
              'option-id'
            ),
            tag: e.target.value
          }
        : { ...formData, [e.target.name]: e.target.value }
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    description === 'Add' && addTodo({ text, tagId, tag });
    description === 'Update' && updateTodo({ text, tagId, tag }, todo._id);
    setModal({ isOpen: false });
  };
  return loading ? (
    <h2>Loading</h2>
  ) : (
    <Card className="todo-form p-4">
      <Card.Body>
        <Row className="d-flex justify-content-between align-items-center mb-5">
          <Card.Title>{description} Todo</Card.Title>

          <Row className="d-flex justify-content-between flex-nowrap"></Row>
        </Row>
        <Form>
          <Form.Row>
            <Col xs={12} sm={12} md={8}>
              <Input
                label="Todo"
                id="todo-text"
                type="text"
                value={text}
                name="text"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </Col>
            <Col xs={12} sm={12} md={4}>
              <Input
                as="select"
                label="Todo Tag"
                id={`todo-tag-${description}`}
                type="text"
                value={tag}
                onChange={(e) => onChange(e)}
                name="tag"
                autoComplete="off"
                pClassName={tagId === '5f5689a2d096a9b777ea4124' ? 'd-none' : ''}
              >
                {tags.map((tag) => {
                  return (
                    <option
                      disabled={tag._id === '5f568965d096a9b777ea4123'}
                      option-id={tag._id}
                      key={tag._id}
                    >
                      {tag.name}
                    </option>
                  );
                })}
              </Input>
              <Input
                inputTextRight="X"
                inputTextRightOnClick={() => {
                  setFormData({ ...formData, tag: '', tagId: '' });
                }}
                label="Create a Tag"
                id={`todo-tag-other-${description}`}
                type="text"
                pClassName={tagId !== '5f5689a2d096a9b777ea4124' ? 'd-none' : 'd-block'}
                value={tagId === '5f5689a2d096a9b777ea4124' ? tag : ''}
                onChange={
                  tagId === '5f5689a2d096a9b777ea4124' ? (e) => onChange(e) : () => {}
                }
                name="tag"
                autoComplete="off"
              />
            </Col>
          </Form.Row>

          <Button
            variant="secondary"
            text={description === 'Update' ? 'Update Todo' : 'Add Todo'}
            onClick={(e) => onSubmit(e)}
            color="white"
            type="submit"
            className="float-right"
            id={`todo-update-add-button-${description}`}
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Todo;
