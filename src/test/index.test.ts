
test('GET api/users returns an empty array', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
});

test('POST api/users creates a user', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'testuser',
            age: 30,
            hobbies: ['hiking', 'fishing'],
        }),
    })

    expect(response.status).toBe(201);
    expect(response.data).toEqual({
        id: expect.any(String),
        username: 'testuser',
        age: 30,
        hobbies: ['hiking', 'fishing'],
    })
})


test('PUT api/users/:id updates a user', async () => {
    const userId = 1
    const updateData = {name:'updated name', age: 31, hobbies: ['hiking', 'fishing', 'cooking']}
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    })

    expect(response.status).toBe(200);
    expect(response.data).toEqual(updateData)
})
