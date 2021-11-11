// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    // Check if data has required content
    if (!data.text) {
      throw new Error('A note must have some text');
    }

    // The logged in user
    const { user } = context.params;
    // Limit the note text length to 400 characters
    const text = data.text.substring(0, 400);

    // Update the data object (and prevent additional submits)
    context.data = {
      text,
      userId: user._id,
      createdAt: new Date().getTime()
    };

    return context;
  };
};
