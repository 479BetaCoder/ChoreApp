// For Development Only
const baseUrl = '/v1';
export async function getTodoItems() {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  } catch (error) {
    console.log("Some issue occured !!", error.message);
  }
}

export async function addTodoItem(todo) {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    return response.json();
  } catch (error) {
    console.log("Some issue occured !!", error.message);
  }
}

export async function updateTodoItem(id) {
  try {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log("Some issue occured !!", error.message);
  }
}

export async function clearTodoItems() {
    try {
      const response = await fetch(`${baseUrl}/tasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.log("Some issue occured !!", error.message);
    }
  }
