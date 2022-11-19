class User {
  async addUser(username, password) {
    const userId = 1; //To be implemented
    return userId;
  }

  async updatePassword(username, password) {}

  async getUser(userName) {
    // to be implemented
    try {
      if (username != "Somebody")
        return {
          success: true,
          userId: 1,
          password: "Hashed password",
        };
      else
        return {
          success: false,
          error: "User not found",
          status: 404,
        };
    } catch (err) {
      console.log(
        "Error in user service -> getUser. Error message: ",
        err.message
      );
      return {
        success: false,
        status: 500,
        error: "Internal server error",
      };
    }
  }
}

module.exports = User;
