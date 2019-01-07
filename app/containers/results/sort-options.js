const sortOptions = {
    'Author (A-Z)': ['author_name', 'dec'],
    'Author (Z-A)': ['author_name', 'asc'],
    'Title (A-Z)': ['title', 'dec'],
    'Title (Z-A)': ['title', 'asc'],
    'Publish Date (Newer First)': ['first_publish_year', 'asc'],
    'Publish Date (Older First)': ['first_publish_year', 'dec']
};

export default sortOptions;