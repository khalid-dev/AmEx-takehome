const sortOptions = {
    'Author (A-Z)': ['author_name', 'asc'],
    'Author (Z-A)': ['author_name', 'dec'],
    'Title (A-Z)': ['title', 'asc'],
    'Title (Z-A)': ['title', 'dec'],
    'Publish Date (Newer First)': ['first_publish_year', 'asc'],
    'Publish Date (Older First)': ['first_publish_year', 'dec']
};

export default sortOptions;